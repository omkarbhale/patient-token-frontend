import { BrowserRouter, Routes, Route } from "react-router-dom";

import CurrentToken from "./pages/CurrentToken";
import TokenDashboard from "./pages/TokenDashboard";
import NoPage from "./pages/NoPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/current-token" element={<CurrentToken />} />
				<Route path="/token-dashboard" element={<TokenDashboard />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
