import React, { useState } from "react";
import SchoolClassSelector from "../../components/SchoolClassSelector";

import { Page, Container } from "./styles";

const Homework: React.FC = () => {
  const [schoolClass, setSchoolClass] = useState<string>("");

  return (
    <Page className="app-safe-area">
      <Container>
        <SchoolClassSelector
          value={schoolClass}
          onChange={(newValue: string) => setSchoolClass(newValue)}
        />
      </Container>
    </Page>
  );
};

export default Homework;
