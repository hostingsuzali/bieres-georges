<?php
function blocksy_child_enqueue() {
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital@0;1&family=Poppins:wght@300;400;500;600&display=swap',
        [], null
    );
}
add_action('wp_enqueue_scripts', 'blocksy_child_enqueue');