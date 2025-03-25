<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the POST request
    $jsonData = file_get_contents('php://input');

    // Try to decode it
    $data = json_decode($jsonData, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        // JSON is valid, now write it to the watches.js file
        $watchesJs = 'const watches = ' . json_encode($data, JSON_PRETTY_PRINT) . ';';
        file_put_contents('../js/watches.js', $watchesJs);
        echo 'Watches file updated successfully';
    } else {
        echo 'Invalid JSON data. Please check the jsonOutput.';
    }
}
?>
