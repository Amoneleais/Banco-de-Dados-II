import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import '../Cadastrar.css';

export default function Inserir() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [cpf, setCpf] = useState('');
    const [address, setAddress] = useState('');
    const [cep, setCep] = useState('');
    const [, setPosts] = useState([]);
    const location = useLocation();
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        carregaId();
    });

    async function clickUpdate(e) {
        e.preventDefault();
        await fetch(`http://localhost:9900/api/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                nome: name,
                email: email,
                cpf: cpf,
                nascimento: new Date(birthdate + 'T08:30:00.000Z').toISOString(),
                endereco: address,
                cep: cep
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setPosts((prevPosts) => [data, ...prevPosts]);
            navigate("/");
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !birthdate || !cpf || !address || !cep) {
            setShowAlert(true);
            return
        }
        setShowAlert(false);
        clickUpdate(e);
    };

    async function carregaId() {
        const idFromLocation = location.state?.id || '';
        setId(idFromLocation);
        console.log(idFromLocation)
        if (idFromLocation && name === '') {
            try {
                const response = await fetch(`http://localhost:9900/api/users/${idFromLocation}`);
                const data = await response.json();
                console.log(data);
                setName(data.nome);
                setEmail(data.email);
                setBirthdate(data.nascimento.substring(0, 10));
                setCpf(data.cpf);
                setAddress(data.endereco);
                setCep(data.cep);
            } catch (error) {
                console.log(error.message);
            }
        }
    }

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
                        <button type="submit" className="btn btn-primary">Atualizar</button>
                    </div>
                    <div className="col-6 text-end">
                        <Link to="/" className="btn btn-secondary">Voltar</Link>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
}
