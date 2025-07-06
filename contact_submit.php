<?php
// STEP 1: Connect to Database
$host = "localhost";
$user = "root";
$password = "";  // Leave blank if you didn’t set a MySQL password
$database = "contact_submissions"; // Your database name

$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// STEP 2: Collect Form Data
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';
$recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

// STEP 3: Verify reCAPTCHA
$secretKey = '6Ld_1XQrAAAAAMuE0wsFoJ_H-LsJuku4BcOUBFys'; //  Replace with your secret key
$verifyURL = "https://www.google.com/recaptcha/api/siteverify";
$response = file_get_contents("$verifyURL?secret=$secretKey&response=$recaptchaResponse");
$responseKeys = json_decode($response, true);

if (!$responseKeys["success"]) {
    echo "<script>alert('reCAPTCHA failed. Please try again.'); window.history.back();</script>";
    exit();
}

// STEP 4: Basic Validation
if (empty($firstName) || empty($lastName) || empty($email)) {
    echo "<script>alert('Please fill out all required fields.'); window.history.back();</script>";
    exit();
}

// STEP 5: Insert into Table
$sql = "INSERT INTO contact (first_name, last_name, email, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $firstName, $lastName, $email, $message);

if ($stmt->execute()) {
    header("Location: thankyou.html");
    exit();
} else {
    echo "Something went wrong: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
