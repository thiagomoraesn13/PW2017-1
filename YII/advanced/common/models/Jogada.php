<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "jogada".
 *
 * @property integer $int
 * @property integer $id_user
 * @property integer $pontuacao
 * @property string $data_hora
 */
class Jogada extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'jogada';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['int', 'id_user', 'pontuacao', 'data_hora'], 'required'
		'message'=>'Este campo é obrigatório'],
            [['int', 'id_user', 'pontuacao'], 'integer'],
            [['data_hora'], 'string', 'max' => 45],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'int' => 'Int',
            'id_user' => 'Id User',
            'pontuacao' => 'Pontuacao',
            'data_hora' => 'Data Hora',
        ];
    }
}
