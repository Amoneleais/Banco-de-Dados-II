import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Inserir  from "./pages/Inserir";
import Atualizar  from "./pages/Atualizar";

export default function RoutesApp(){
    return(
    <BrowserRouter>
      <Routes>
          <Route  path="/" exact element={<Inicio />} />
          <Route  path="/Inserir" element={<Inserir />} />
          <Route  path="/Atualizar" element={<Atualizar />} />
          {/* <Route  path="/Inserir" element={<Update />} /> */}
      </Routes>
    </BrowserRouter>
    );
}