import { Model, DataTypes, NOW } from 'sequelize';
import sequelize from '../utils/sequelizeConfig';

interface ExchangeAttributes {
  id?: number;  // ID da transação
  userId: number;   // ID do usuário
  base: string;   // Moeda origem
  originalValue: number;  // Valor origem
  exchangeCoin: string;   // Moeda destino
  exchangedValue: number;   // Valor destino
  rate: number;   // Taxa de conversão utilizada
  date?: Date;   // Data/Hora UTC
}

class Exchange extends Model<ExchangeAttributes> implements ExchangeAttributes {
  public id!: number;
  public userId!: number;
  public base!: string;
  public originalValue!: number;
  public exchangeCoin!: string;
  public exchangedValue!: number;
  public rate!: number;
  public date!: Date;
}

Exchange.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  base: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalValue: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  exchangeCoin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exchangedValue: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  rate: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  date: {
    type: DataTypes.NOW,
    defaultValue: NOW(),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Exchange',
  timestamps: false,
});

export default Exchange;
