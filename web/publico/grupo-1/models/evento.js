const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  type: { type: String, enum: ['Point'], required: true },
  coordinates: { type: [Number], required: true },
});

const eventoSchema = new mongoose.Schema({
  nomeEvento: { type: String, required: true },
  dataInicio: { type: Date, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String, required: true },
  urlLogo: { type: String, required: true },
  urlSite: { type: String, required: true },
  endereco: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  categoria: { type: String, required: true },
  numero: { type: String, required: true },
  cep: { type: String, required: true },
  data_cadastro: { type: Date, default: Date.now }
});

const Evento = mongoose.models.Evento || mongoose.model('Evento', eventoSchema);

module.exports = Evento;
