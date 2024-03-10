import axios from "axios";

const GreenHouseService = (() => {
  const greenHouseEndpoints = {
    greenHouseGetAllDataById: "http://localhost:3001/greenHouseData",
  };

  const getAllGreenHouseDataById = async (id) => {
    const result = await axios.get(
      `${greenHouseEndpoints.greenHouseGetAllDataById}/${id}`
    );
    console.log(result.data);
    return result.data;
  };

  return {
    getAllGreenHouseDataById,
  };
})();

export default GreenHouseService;
