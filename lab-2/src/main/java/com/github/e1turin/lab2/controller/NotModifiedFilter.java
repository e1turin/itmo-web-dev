package com.github.e1turin.lab2.controller;

import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter(filterName = "NotModifiedFilter")
public class NotModifiedFilter implements Filter {
    private FilterConfig config;

    public void init(FilterConfig config) throws ServletException {
        Filter.super.init(config);
        this.config = config;
    }

    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
        long lastModifiedFromBrowser = req.getDateHeader("If-Modified-Since");
        long lastModifiedFromServlet = getLastModifiedFromServlet();
        if (lastModifiedFromBrowser != -1 && lastModifiedFromServlet != -1 && lastModifiedFromServlet < lastModifiedFromBrowser) {
            resp.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
            return;
        }
        chain.doFilter(servletRequest, servletResponse);
    }

    private long getLastModifiedFromServlet() {
        Object record = config.getServletContext().getAttribute("lastModifiedFromServlet");
        if (record != null) {
            return (Long) record;
        }
        return -1;
    }
}
