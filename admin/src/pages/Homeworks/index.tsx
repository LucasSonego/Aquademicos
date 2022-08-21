import React, { useState } from "react";
import { Link } from "react-router-dom";

import SchoolClassSelector from "../../components/SchoolClassSelector";

import { Page, Container } from "./styles";

const Homeworks: React.FC = () => {
  const [schoolClass, setSchoolClass] = useState<string>("");

  return (
    <Page className="app-safe-area">
      <Container>
        <SchoolClassSelector
          value={schoolClass}
          onChange={(newValue: string) => setSchoolClass(newValue)}
        />

        {schoolClass && (
          <>
            <Link to={`/atividades/${schoolClass}/criar`}>
              <button>Criar {schoolClass}</button>
            </Link>
          </>
        )}
      </Container>
    </Page>
  );
};

export default Homeworks;
