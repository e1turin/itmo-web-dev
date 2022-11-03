package com.github.e1turin.lab2.controller;

import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@WebFilter(filterName = "NotModifiedFilter")
public class NotModifiedFilter implements Filter {
    private FilterConfig config;
    private static final Logger logger = LoggerFactory.getLogger(NotModifiedFilter.class);

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
        logger.info("URL: " + req.getRequestURL());

        long lastModifiedFromBrowser = req.getDateHeader("If-Modified-Since");
        long lastModifiedFromServlet = getLastModifiedFromServlet();
        if (lastModifiedFromBrowser != -1 && lastModifiedFromServlet != -1 && lastModifiedFromServlet < lastModifiedFromBrowser) {
            logger.info("Filtered URL: " + req.getRequestURL() + ", session id:" + req.getSession().getId());
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
