import { useState} from 'react';

export default function FormularioAviso({ onPublicar, onSalvar, editano, onCancelar }) {
   const [titulo, setTitulo] = useState(editando ? editando.title : '');
   const [texto, setTexto] = useState(editando ? editando.body : '');
   const [erro, setErro] = useState(null);

   async function handleSubmit(event) {
    event.preventDefault();

    if(!titulo.trim() || !texto.trim()) {
        setErro('Título e texto são obrigatórios.');
        return;
        }

    setErro(null);

    if(editando) { 
        await onSalvar({ ...editando, title: titulo, body: texto });
    } else {
        await onPublicar({ title: titulo, body: texto });
    }

    if (!editando) {
        setTitulo('');
        setTexto('');
    }
   }

   return (
    <form onSubmit={handleSubmit}> 
        <h2>{editando ? 'Editar Aviso' : 'Novo Aviso'}</h2>
        <input 
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        />
        <textarea 
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Texto do aviso"
        />
        <button type="submit">{editando ? 'Salvar' : 'Publicar'}</button>
        {editando && <button type="button" onClick={onCancelar}>Cancelar</button>}
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
   )
}