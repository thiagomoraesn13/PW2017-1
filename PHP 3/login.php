<?php
	session_start();
	if(!isset($_SESSION["start"])){
		$_SESSION["login"] = "demo";
		$_SESSION["senha"] = "demo";
	}else{
		echo "Passei outra vez";
	}
?>


<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
</head>
<body>
	<form id="login" method="POST" action="">
		<fieldset>
			<label>Login:</label>
			<input type="text" name="login"><br>

			<label>Digite sua senha:</label>
			<input type="password" name="senha" id="senha"><br>
		</fieldset>
		<input type="submit" value="Enviar Dados" name="submit">
	</form>

	<?php
		if($_POST["login"] == $_SESSION["login"]){
			if($_POST["senha"] == $_SESSION["senha"]){
				header("Location: index2.html");
			}
		}
	?>
</body>
</html>
