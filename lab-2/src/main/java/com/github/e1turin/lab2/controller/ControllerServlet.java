package com.github.e1turin.lab2.controller;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "ControllerServlet")
public class ControllerServlet extends HttpServlet {
    private static final Logger logger = LoggerFactory.getLogger(ControllerServlet.class);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        logger.info("URL: " + request.getRequestURI());

        PrintWriter out = response.getWriter();

        String[] xValues = request.getParameterValues("x");
        String[] yValues = request.getParameterValues("y");
        String[] rValues = request.getParameterValues("r");
        String[] resetOptionValues = request.getParameterValues("reset");
        String[] restoreOptionValues = request.getParameterValues("restore");

        if (resetOptionValues != null) {
            if (resetOptionValues.length > 1) {
                response.setStatus(400); //TODO: define statuses
                out.println("<h1>Error: Wrong number of arguments (too many) for resetting table</h1>"); //Todo: define msg
                return;
            }
            request.getRequestDispatcher("/ResultsServlet").forward(request, response);
        } else if (restoreOptionValues != null) {
            if (restoreOptionValues.length > 1) {
                response.setStatus(400); //TODO: define statuses
                out.println("<h1>Error: Wrong number of arguments (too many) for restoring table</h1>"); //Todo: define msg
                return;
            }
            request.getRequestDispatcher("/ResultsServlet").forward(request, response);
        } else if (xValues != null && yValues != null && rValues != null) {
            if (xValues.length > 1 || yValues.length > 1 || rValues.length > 1) {
                response.setStatus(400); //TODO: define statuses
                out.println("<h1>Error: Wrong number of arguments for shot</h1>"); //Todo: define msg
                return;
            }
            request.getRequestDispatcher("/AreaCheckServlet").forward(request, response);
        } else {
            response.setStatus(400);
        }

        out.println("<h1>Error: Unable to process parameters</h1>"); //Todo: define msg

    }
}
