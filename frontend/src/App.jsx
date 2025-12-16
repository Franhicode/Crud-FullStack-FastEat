import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/common/Layout'
import { Home } from './pages/Home'
import { ClientesPage } from './pages/ClientesPage'
import { PedidosPage } from './pages/PedidosPage'

export const App = () => {
  return (
    <>
    
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
        </Route>
      </Routes>
    </>
  )
}
