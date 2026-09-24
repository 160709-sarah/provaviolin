import CartaoAviso from 'src/CartaoAviso'

export default function ListaAvisos({ avisos, onEditar, onExcluir }) {
  return (
    <section>
      <h2>Avisos publicados ({avisos.length})</h2>
      {avisos.map(aviso => (
        <CartaoAviso
          key={aviso.id}
          aviso={aviso}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </section>
  )
}
