package com.github.e1turin.lab3.model;

import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import java.util.stream.Collectors;

@WebServlet(name = "ResultServlet", value = "/ResultServlet")
public class ResultsServlet extends HttpServlet {
    private static final Logger logger = LoggerFactory.getLogger(ResultsServlet.class);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        logger.info("URL: " + request.getRequestURI());
        Date date = Calendar.getInstance().getTime();

        PrintWriter out = response.getWriter();

        String[] resetValues = request.getParameterValues("reset");
        String[] restoreValues = request.getParameterValues("restore");

        if (resetValues != null) {
            List<Boolean> resetOptionValues = getValidValues(response, out, resetValues);
            if (resetOptionValues == null) return;
            if (resetOptionValues.size() != 1) {
                response.setStatus(400); //TODO: define statuses
                out.println("<h1>Error: too many parameters for reset</h1>");
                return;
            } else {
                Boolean resetOption = resetOptionValues.get(0);
                if (resetOption == null) {
                    response.setStatus(400); //TODO: define statuses
                    out.println("<h1>Error: Incorrect parameters</h1>");
                    out.print("<p>");
                    out.print("Parsed value of parameters: (reset=" + resetOption + ")");
                    out.print("</p>");
                    return;
                }

                if (resetOption) {
                    HttpSession session = request.getSession();
                    session.setAttribute("attemptRecords", new ArrayList<AttemptRecord>());

                    getServletContext().setAttribute("lastModifiedFromServlet", date.getTime());
                }
            }
        }

        if (restoreValues != null) {
            List<Boolean> restoreOptionValues = getValidValues(response, out, restoreValues);
            if (restoreOptionValues == null) return;

            if (restoreOptionValues.size() != 1) {
                response.setStatus(400); //TODO: define statuses
                out.println("<h1>Error: too many parameters for restore</h1>");
                return;
            } else {
                Boolean restoreOption = restoreOptionValues.get(0);
                if (restoreOption == null) {
                    response.setStatus(400); //Todo: define statuses
                    out.println("<h1>Error: Incorrect parameters</h1>");
                    out.print("<p>");
                    out.print("Parsed value of parameters: (restore=" + restoreOption + ")");
                    out.print("</p>");
                    return;
                }

                if (restoreOption) {
                    HttpSession session = request.getSession();
                    Object attempts = session.getAttribute("attemptRecords");
                    ArrayList<AttemptRecord> attemptRecords;
                    if (attempts != null) {
                        attemptRecords = (ArrayList<AttemptRecord>) attempts;
                    } else {
                        attemptRecords = new ArrayList<>();
                    }
                    Gson gson = new Gson();
                    String JSONResponse = gson.toJson(attemptRecords);
                    out.println(JSONResponse);
                }
            }
        }
    }


    private List<Boolean> getValidValues(HttpServletResponse response, PrintWriter out, String[] restoreValues) {
        List<Boolean> restoreOptionValues;
        try {
            restoreOptionValues = Arrays.stream(restoreValues).map(Boolean::parseBoolean).collect(Collectors.toList());
        } catch (Exception e) {
            response.setStatus(400); //TODO: define statuses
            out.println("<h1>Error: Unable to process parameters</h1>");
            out.print("<p>");
            out.print(e.getMessage());
            out.print("</p>");
            return null;
        }
        return restoreOptionValues;
    }
}
