<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        $postsJs = 'const posts = ' . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . ';';
        file_put_contents('../js/posts.js', $postsJs);
        echo json_encode(['message' => 'Постовете са актуализирани успешно!']);
    } else {
        echo json_encode(['error' => 'Фатална грешка.']);
    }
}
?>