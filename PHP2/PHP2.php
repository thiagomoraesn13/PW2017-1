<html>
<head>
	<meta charset="UTF-8">
	<title>Impressão</title>
</head>
<body>

<?php

	$usuario = "root";
	$senha = "root";
	try{
		$conn = new PDO("mysql:host=localhost;dbname=Snake", $usuario, $senha);
		$conn->exec("set names utf8");
		$stmt = $conn->prepare("INSERT INTO mensagem (nome, email, website, mensagem) VALUES (:nome, :email, :website, :mensagem)");
		$stmt->bindValue(':nome', $_POST['nome']);
		$stmt->bindValue(':email', $_POST['email']);
		$stmt->bindValue(':website', $_POST['website']);
		$stmt->bindValue(':mensagem', $_POST['mensagem']);
		$stmt->execute();

		$stmt = $conn->prepare('SELECT * FROM mensagem');
		$stmt->execute();
		while($row = $stmt->fetch(PDO::FETCH_OBJ)){
			print($row->nome . "<br />");
			print($row->email . "<br />");
			print($row->website . "<br />");
			print($row->mensagem . "<br />");
		}
	}catch (PDOException $e){
		echo $e->getMessage();
	}
?>
</body>
</html>
