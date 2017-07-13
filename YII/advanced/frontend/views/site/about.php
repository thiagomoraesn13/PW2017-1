<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'Sobre';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Esta é a página Sobre:</p>
    <p><?= $data ?></p>
    <code><?= __FILE__ ?></code>
</div>
