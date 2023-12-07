import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import InputMask from 'react-input-mask';
import '../Cadastrar.css';

export default function Inserir() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [cpf, setCpf] = useState('');
    const [address, setAddress] = useState('');
    const [cep, setCep] = useState('');
    const [, setPosts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    
async function clickInsert() {
    await fetch('http://localhost:9900/api/users/create', {
        method: 'POST',
        body: JSON.stringify({
            nome: name,
            email: email,
            cpf: cpf,
            nascimento: new Date(birthdate + 'T08:30:00.000Z').toISOString(),
            endereco: address,
            cep: cep,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        setPosts((posts) => [data, ...posts]);
        console.log("Data to be sent:", {
            nome: name,
            email: email,
            nascimento: birthdate,
            cpf: cpf,
            endereco: address,
            cep: cep,
        });
        navigate("/");
    })
    .catch((err) => {
        console.error('Error inserting data:', err);
    });
  }
  
const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!name ||!email ||!birthdate || !cpf || !address || !cep) {
      setShowAlert(true);
      return
    }
    setShowAlert(false);
    clickInsert();
};

return (
    <div className="container-fluid">
        <div className="box p-4 text-center">
            {showAlert && (
            <div className="alert alert-danger" role="alert">
                Por favor insira todos os campos.
            </div>
            )}
            <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Nome
                </label>
                <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Email
                </label>
                <input
                type="text"
                className="form-control"
                id="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="birthdate" className="form-label">
                Data de Nascimento
                </label>
                <input
                type="date"
                className="form-control"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="cpf" className="form-label">
                CPF
                </label>
                <InputMask
                mask="999.999.999-99"
                maskChar={null}
                className="form-control"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="cep" className="form-label">
                CEP
                </label>
                <InputMask
                mask="99.999-999"
                maskChar={null}
                className="form-control"
                id="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label">
                Endereço
                </label>
                <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div className="row">
                <div className="col-6">
                <button type="submit" className="btn btn-primary">
                    Cadastrar
                </button>
                </div>
                <div className="col-6 text-end">
                <Link to="/" className="btn btn-secondary">
                    Voltar
                </Link>
                </div>
            </div>
            </form>
        </div>
    </div>
  );
}