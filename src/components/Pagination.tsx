import React, { useState } from "react";

interface PaginationProps {
  data: any[]; // Array de dados a serem paginados
  itemsPerPage: number; // Número de itens por página
}

const Pagination: React.FC<PaginationProps> = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula o índice inicial e final dos itens da página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtém os itens da página atual
  const currentItems = data.slice(startIndex, endIndex);

  // Função para avançar para a próxima página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Função para voltar para a página anterior
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calcula o número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      {/* Renderize os itens da página atual */}
      {currentItems.map((item, index) => (
        <div key={index}>{item}</div>
      ))}

      {/* Renderize os botões de navegação */}
      <button onClick={previousPage} disabled={currentPage === 1}>
        Anterior
      </button>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
