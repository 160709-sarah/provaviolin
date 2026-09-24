export default function CartaoAviso({ aviso, onEditar, onExcluir}) {
    return (
        <div className="cartao">
            <h3>{aviso.title}</h3>
            <p>{aviso.body}</p>
            <small> post id {aviso.id} - publicado pelo usuário {aviso.userId}</small>
        <div>
         <button onClick={() => onEditar(aviso)}>Editar</button>
         <button onClick={() => onExcluir(aviso.id)}>Excluir</button>
         </div>
         </div>
    )
}

