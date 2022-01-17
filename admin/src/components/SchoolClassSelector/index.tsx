import React, { useRef, useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { MdExpandMore } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { SimplifiedSchoolClassData } from "../../pages/SchoolClasses/interfaces";

import { Container, SearchBar, Input } from "./styles";
import useFetch from "../../hooks/useFetch";

interface Props {
  value: string;
  onChange: (newValue: String) => void;
}

const SchoolClassSelector: React.FC<Props> = (props) => {
  const inputEl = useRef(null);
  const [focus, setFocus] = useState<boolean>(false);
  const [filteredList, setFilteredList] = useState<SimplifiedSchoolClassData[]>(
    []
  );
  const [search, setSearch] = useState<string>("");
  const [compactMode, setCompactMode] = useState(false);
  const [selectedClass, setSelectedClass] =
    useState<SimplifiedSchoolClassData | null>(null);

  const { data: schoolClassesList }: { data: SimplifiedSchoolClassData[] } =
    useFetch({
      path: "/school_classes_public",
      params: {},
    });

  function handleSearch(searchStr: string) {
    setSearch(searchStr);
    let filtered = schoolClassesList.filter((schoolClass) =>
      schoolClass.name.toLowerCase().includes(searchStr.toLowerCase())
    );
    setFilteredList(filtered);
  }

  return (
    <Container>
      <div
        className={compactMode ? "header compact-mode-header" : "header"}
        onClick={() => compactMode && setCompactMode(false)}
      >
        <div className="selected">
          <SiGoogleclassroom />
          <span>{selectedClass?.name || "Selecione uma turma"}</span>
        </div>
        <SearchBar
          onClick={() => inputEl.current.focus()}
          focus={focus}
          noResults={search !== "" && filteredList.length === 0}
        >
          <Input
            placeholder="Buscar turma"
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            ref={inputEl}
            onBlur={() => setFocus(false)}
            focus={focus}
            onFocus={() => {
              if (!focus) {
                setFocus(true);
                setCompactMode(false);
              }
            }}
            noResults={search !== "" && filteredList.length === 0}
            spellCheck="false"
          />
          <GoSearch />
        </SearchBar>
      </div>
      {!compactMode && (
        <ul className="list">
          {filteredList.length
            ? filteredList.map((schoolClass) => (
                <li
                  className={
                    schoolClass.id === selectedClass?.id
                      ? "school-class current"
                      : "school-class"
                  }
                  key={schoolClass.id}
                  onClick={() => {
                    props.onChange(schoolClass.id);
                    setSelectedClass(schoolClass);
                    setCompactMode(true);
                  }}
                >
                  <span>{schoolClass.name}</span>
                  <MdExpandMore />
                </li>
              ))
            : schoolClassesList &&
              schoolClassesList.map((schoolClass) => (
                <li
                  className={
                    schoolClass.id === selectedClass?.id
                      ? "school-class current"
                      : "school-class"
                  }
                  key={schoolClass.id}
                  onClick={() => {
                    props.onChange(schoolClass.id);
                    setSelectedClass(schoolClass);
                    setCompactMode(true);
                  }}
                >
                  <span>{schoolClass.name}</span>
                  <MdExpandMore />
                </li>
              ))}
        </ul>
      )}
    </Container>
  );
};

export default SchoolClassSelector;
