import dotenv from "dotenv";
import { setupSwagger } from "./src/config/swagger";
dotenv.config();

import app from "./src/app";

const PORT = process.env.PORT || 3000;
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger running at http://localhost:${PORT}/api-docs`);
});
