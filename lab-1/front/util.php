<?php

function selection_bubble($type, $id)
{
    return "<div class=\"sel-bubble\">
                <label for=\"{$id}\">-6</label >
                <input type=\"{$type}\" id=\"{$id}\" />  
            </div>";
}
