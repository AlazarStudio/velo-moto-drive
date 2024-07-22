import { Route, Routes } from 'react-router-dom'

import CardDetailPage from './Components/Pages/CardDetailPage/CardDetailPage'
import CartPage from './Components/Pages/CartPage/CartPage'
import CatalogPage from './Components/Pages/CatalogPage/CatalogPage'
import DeliveryPage from './Components/Pages/DeliveryPage/DeliveryPage'
import Main from './Components/Pages/MainPage/MainPage'
import Non_Found_Page from './Components/Pages/Non_Found_Page'
import Layout from './Components/Standart/Layout/Layout'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />
					<Route path='/catalog' element={<CatalogPage />} />
					<Route path='/catalog/:id' element={<CatalogPage />} />
					<Route path='/catalog/:id/page/:page' element={<CatalogPage />} />
					<Route path='/delivery' element={<DeliveryPage />} />
					<Route path='/shopping-cart' element={<CartPage />} />
					<Route path='/product/:id' element={<CardDetailPage />} />
					<Route path='*' element={<Non_Found_Page />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
