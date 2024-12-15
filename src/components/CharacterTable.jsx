import React, { useState, useEffect } from "react";
import FilterControls from "./FiltersControls"; // FiltersControls bileşenini içeri aktar
import Pagination from "./TablePagination"; // Pagination bileşenini içeri aktar
import CharacterRow from "./CharactersRow"; // CharacterRow bileşenini içeri aktar

const RickAndMortyTable = () => {
  // Tüm karakterleri tutan state
  const [characters, setCharacters] = useState([]);
  // Filtrelenmiş karakterleri tutan state
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  // Genişletilmiş satırların ID'lerini tutan state
  const [expandedRows, setExpandedRows] = useState([]);
  // Arama çubuğu için kullanılan isim state
  const [searchName, setSearchName] = useState("");
  // Filtreleme kriterlerini tutan state
  const [filters, setFilters] = useState({
    status: "",
    species: "",
    origin: "",
    location: "",
  });
  // Sayfalama için geçerli sayfa state
  const [currentPage, setCurrentPage] = useState(1);
  // Sayfa başına gösterilecek satır sayısı
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Sıralama bilgilerini tutan state
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  // API'den tüm karakter verilerini çeken useEffect.
  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allCharacters = [];
      let nextUrl = "https://rickandmortyapi.com/api/character";
      try {
        //Döngü içerisinde bütün sayfalardaki veriler alınıyor.
        while (nextUrl) {
          const response = await fetch(nextUrl);
          const data = await response.json();
          // Yeni verileri mevcut listeye ekle
          allCharacters = [...allCharacters, ...data.results];
          nextUrl = data.info.next;
        }
        setCharacters(allCharacters); // Tüm karakterleri kaydet.
        setFilteredCharacters(allCharacters); // Seçilmiş filtreleri uygula.
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAllCharacters();
  }, []);
  // Belirli bir özelliğin (`status`, `species`, ...) benzersiz değerlerini döndürür.
  const uniqueValues = (key) => {
    return Array.from(
      new Set(
        characters.map((character) => {
          // Eğer özellik `origin` veya `location` objeleri ise `name` alanını kontrol et.
          if (key === "origin" || key === "location") {
            return character[key]?.name || "";
          }
          return character[key] || "";
        })
      )
    ).filter((value) => value);
  };
  // Filtreleri uygulayarak karakter listesini günceller.
  const applyFilters = () => {
    let results = characters;

    if (searchName) {
      results = results.filter((character) =>
        character.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    // Diğer filtre kriterlerini uygula
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "origin" || key === "location") {
          results = results.filter(
            (character) => character[key]?.name === value
          );
        } else {
          results = results.filter((character) => character[key] === value);
        }
      }
    });
    // Filtrelenmiş karakterler varsa güncelle, yoksa uyarı göster
    if (results.length > 0) {
      setFilteredCharacters(results);
    } else {
      alert("No characters match the applied filters.");
    }
  };
  // Tüm filtreleri temizler ve karakter listesini sıfırlar
  const clearFilters = () => {
    setSearchName("");
    setFilters({ status: "", species: "", origin: "", location: "" });
    setFilteredCharacters(characters);
  };
  // Bir satırın genişleme durumunu kontrol eder
  const toggleRow = (id) => {
    setExpandedRows((prevRows) => {
      if (prevRows.includes(id)) {
        // Eğer zaten genişlemişse, kaldır
        return prevRows.filter((rowId) => rowId !== id);
      } else {
        // Değilse, genişlet
        return [...prevRows, id];
      }
    });
  };
  // Tablo sıralamasını kontrol eder
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    // Verileri sıralar
    const sortedData = [...filteredCharacters].sort((a, b) => {
      if (key === "name") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else if (key === "episodeCount") {
        return direction === "asc"
          ? a.episode.length - b.episode.length
          : b.episode.length - a.episode.length;
      }
      return 0;
    });

    setFilteredCharacters(sortedData);
  };
  // Geçerli sayfada gösterilecek satırların başlangıç ve bitiş indekslerini hesaplar
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCharacters.slice(indexOfFirstRow, indexOfLastRow);
  // Toplam sayfa sayısını hesaplar
  const totalPages = Math.ceil(filteredCharacters.length / rowsPerPage);

  return (
    <div>
      {/* Filtreleme kontrolleri */}
      <FilterControls
        searchName={searchName}
        setSearchName={setSearchName}
        filters={filters}
        setFilters={setFilters}
        uniqueValues={uniqueValues}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      {/* Tablo ve başlıklar */}
      <table border="1" style={{ textAlign: "left" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              Name{" "}
              {sortConfig.key === "name" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </th>
            <th>Status</th>
            <th>Species</th>
            <th>Type</th>
            <th>Gender</th>
            <th
              onClick={() => handleSort("episodeCount")}
              style={{ cursor: "pointer" }}
            >
              Number of Episodes{" "}
              {sortConfig.key === "episodeCount" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        {/* Her karakter için bir tablo satırı render edilir */}
        <tbody>
          {currentRows.map((character) => (
            <CharacterRow
              key={character.id}
              character={character}
              expandedRows={expandedRows}
              toggleRow={toggleRow}
            />
          ))}
        </tbody>
      </table>
      {/* Sayfalama kontrolleri */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default RickAndMortyTable;
