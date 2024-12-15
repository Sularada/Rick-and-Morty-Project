import React from "react";

// CharacterRow bileşeni, her bir karakterin bilgilerini tablo satırı olarak render eder.
// Tıklanan satır genişleyerek daha fazla bilgi (origin, location ve episode listesi) gösterir.

const CharacterRow = ({ character, expandedRows, toggleRow }) => {
  return (
    <React.Fragment>
      <tr onClick={() => toggleRow(character.id)} style={{ cursor: "pointer" }}>
        {/* Karakterin temel bilgileri: isim, durumu, türü, tipi, cinsiyeti ve bölüm sayısı */}
        <td>
          <img
            src={character.image}
            alt={character.name}
            style={{ width: "50px", height: "50px" }}
          />
        </td>
        <td>{character.name}</td>
        <td>{character.status}</td>
        <td>{character.species}</td>
        <td>{character.type}</td>
        <td>{character.gender}</td>
        <td>{character.episode.length}</td>
      </tr>
      {/* Eğer satıra tıklanırsa tıklanılan satırdaki karakterin satırı genişletiliyor, daha fazla detaylı bilgi gösteriliyor. */}
      {expandedRows.includes(character.id) && (
        <tr>
          <td colSpan="2">
            <div>
              <strong>Episodes:</strong>
              <ul>
                {character.episode.map((episodeUrl, index) => (
                  <li key={index}>Episode {episodeUrl.split("/").pop()}</li>
                ))}
              </ul>
              {/* Karakterin bulunduğu bölümleri listeler. */}
            </div>
          </td>
          <td colSpan="3">
            <p>
              <strong>Origin:</strong>
              {" " + character.origin?.name || "Unknown"}
            </p>
            {/*Karakterin kökenini yazdırır.*/}
          </td>
          <td colSpan="2">
            <p>
              <strong>Location:</strong>{" "}
              {" " + character.location?.name || "Unknown"}
            </p>
            {/*Karakterin lokasyonunu yazdırır.*/}
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default CharacterRow;
