package com.github.e1turin.lab2.model;

import com.github.e1turin.lab2.model.figure.Point;
import com.google.gson.Gson;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@WebServlet(name = "AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    private static final Logger logger = LoggerFactory.getLogger(AreaCheckServlet.class);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        logger.info("URL: " + request.getRequestURI());

        long startTime = System.currentTimeMillis();
        PrintWriter out = response.getWriter();
        List<Double> xParamValues;
        List<Double> yParamValues;
        List<Double> rParamValues;

        try {
            xParamValues = Arrays.stream(request.getParameterValues("x"))
                    .map(this::validateInputNumber)
                    .map(Double::parseDouble)
                    .collect(Collectors.toList());
            yParamValues = Arrays.stream(request.getParameterValues("y"))
                    .map(this::validateInputNumber)
                    .map(Double::parseDouble)
                    .collect(Collectors.toList());
            rParamValues = Arrays.stream(request.getParameterValues("r"))
                    .map(this::validateInputNumber)
                    .map(Double::parseDouble)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            response.setStatus(400); //Todo: define statuses
            out.println("<h1>Error: Unable to process parameters</h1>");
            out.print("<p>");
            out.print(e.getMessage());
            out.print("</p>");
            return;
        }

        Double xParam = xParamValues.get(0);
        Double yParam = yParamValues.get(0);
        Double rParam = rParamValues.get(0);
        if (xParam == null || yParam == null || rParam == null) {
            response.setStatus(400); //Todo: define statuses
            out.println("<h1>Error: Incorrect parameters</h1>");
            out.print("<p>");
            out.print("Parsed value of parameters: (x=" + xParam + ", y=" + yParam + ", r=" + rParam + ")");
            out.print("</p>");
            return;
        }

        Point point = Point.of(xParam, yParam, rParam);
        HttpSession session = request.getSession();
        ArrayList<AttemptRecord> attemptRecords = (ArrayList<AttemptRecord>) session.getAttribute("attemptRecords");

        if (attemptRecords == null) {
            attemptRecords = new ArrayList<>();
        }

        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy-hh:mm:ss z");
        String currTime = dateFormat.format(date);
        long runningTime = System.currentTimeMillis() - startTime;

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        AttemptRecord currAttemptRecord = AttemptRecord.of(point, isPointInsideArea(point), runningTime, currTime);
        attemptRecords.add(currAttemptRecord);
        session.setAttribute("attemptRecords", attemptRecords);

        //TODO: try{}catch{} as gson can fail with serializing Double.infinity
        Gson gson = new Gson();
        String JSONResponse = gson.toJson(currAttemptRecord);
        out.println(JSONResponse);
    }

    private String validateInputNumber(String number) { //TODO
        int endIndex = Math.min(number.length(), 9);
        if (!number.trim().matches("^(-?\\d+)\\.?(\\d*)$")){
            return null;
        }
        return number.substring(0, endIndex);
    }

    private boolean isPointInsideArea(Point point) {
        return point != null && (inSector(point.x(), point.y(), point.r())
                || inTriangle(point.x(), point.y(), point.r())
                || inRectangle(point.x(), point.y(), point.r()));
    }

    private boolean inTriangle(Double x, Double y, Double r) {
        return x >= 0 && 2 * x < r && y <= r && y >= 0 && y + 2 * x <= r;
    }

    private boolean inRectangle(Double x, Double y, Double r) {
        return x <= 0 && x >= -r
                && y <= 0 && y >= -r;
    }

    private boolean inSector(Double x, Double y, Double r) {
        return x >= 0 && y <= 0
                && 4 * x * x + 4 * y * y <= r * r;
    }
}
