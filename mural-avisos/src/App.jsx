import {useState, useEffect} from 'react';
import './App.css'
import FormularioAviso from "src/components/FormularioAviso";
import ListaAvisos from "src/components/ListaAvisos";




function App() {
  const[avisos, setAvisos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const[erro, setErro] = useState(null);
  const [editandoAviso, setEditandoAviso] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function carregarAvisos() {
      try {
        setCarregando(true);
        setErro(null);
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!resp.ok) throw new Error('HTTP ${resp.status}')
          const data = await resp.json()
          setAvisos(data); 
          } catch (error) {
            if (error.name !== 'AbortError') {
              setErro(error.message);
            }
          } finally { 
            setCarregando(false);
          }
      }
       carregarAvisos()

       return () => controller.abort();
    }, []); 
   
    async function excluirAviso(id) {
      const anterior = avisos 
      setAvisos(prev => prev.filter(aviso => aviso.id !== id));

      try { 
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts/${id}', {
            method: 'DELETE'
        })
        if (!resp.ok) throw new Error('HTTP ${resp.status}')
      } catch (error) { 
    setAvisos(anterior);
    setErro('Falha ao excluir aviso: ${error.message}');
  }
     }
    

  
  return (
    <main>
      <h1>Mural de Avisos</h1>
      <FormularioAviso />
      {carregando && <p>Carregando...</p>}
      {erro && <p>Erro: {erro}</p>}
      {avisos.length === 0 && !carregando && <p>Nenhum aviso encontrado.</p>}
      <ListaAvisos avisos={avisos} />
     </main>
  )
}

export default App
