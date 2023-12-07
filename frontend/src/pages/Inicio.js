import {  Link } from "react-router-dom";
import React, { useState, useEffect }  from 'react';

export default function Inicio()
{
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9900/api/users/get')
          .then((response) => response.json())
          .then((data) => {
            setPosts(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        }, 
    []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:9900/api/users/delete/${id}`, {
                method: 'DELETE',
            });
            const updatedPosts = posts.filter((post) => post._id !== id);
            setPosts(updatedPosts);
        } catch (error) {
            console.log(error.message);
        }
    }

   return (
    <div className='container mt-5'>
        <a className="btn btn-success p-3 px-5 mt-4 mb-2" href="/Inserir" role="button">Inserir</a>
        <div className="shadow-lg mb-2 bg-light rounded">
            <div>
                <table className="table table-responsive table-bordered table-striped rounded">
                    <thead className="text-center">
                        <tr className="bg-light">
                            <th scope="col" width="30%">Nome</th>
                            <th scope="col" width="15%">Email</th>
                            <th scope="col" width="5%">Data de Nascimento</th>
                            <th scope="col" width="15%">CPF</th>
                            <th scope="col" width="15%">CEP</th>
                            <th scope="col" width="25%">Endereço</th>
                        </tr>
                    </thead>
                    <tbody>
                    {posts.map((post) => {
                        return (
                            <tr key={post._id}>
                                <td>{post.nome}</td>
                                <td>{post.email}</td>
                                <td>{new Date(post.nascimento).toLocaleDateString('pt-BR')}</td>
                                <td>{post.cpf}</td>
                                <td>{post.cep}</td>
                                <td>{post.endereco}</td>
                                <th className="text-center"><Link className="btn btn-primary" to="/Atualizar" state={{id: post._id}} >Editar</Link></th>
                                <th className="text-center"><Link className="btn btn-danger" to="/" onClick={(e) => { e.preventDefault(); handleDelete(post._id) }}>Excluir</Link></th>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}