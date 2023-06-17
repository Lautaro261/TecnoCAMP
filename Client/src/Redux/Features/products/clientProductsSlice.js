import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  currentFilteredProducts: [],
  productsByCategory: [],
  productDetails: {},
  category:"",
  idCategory: "",
  idBrand: "",
  minPrice: 1,
  maxPrice: 8000000,
  selectedValueToFilter: "",
  status: "idle",
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "clientProducts/getAllProducts",
  async () => {
    try {
      const response = await axios.get("/client/allproducts");
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
);

export const getFilteredProducts = createAsyncThunk(
  "clientProducts/getFilteredProducts",
  async (dataBody) => {
    try {
      const response = await axios.post("/client/filtersComb", dataBody);
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "clientProducts/getProductsByCategory",
  async (idProduct) => {
    //console.log('id filtro por categoria', idProduct )
    try {
      const response = await axios.get(`/client/filterCategory/${idProduct}`);
      //console.log('getproductByCategory OKKKK', response.data)

      return response.data;
    } catch (error) {
      console.log("ERRORRRRRR en getProductsByCategory", error);
      throw error;
    }
  }
);

export const getProductDetails = createAsyncThunk(
    "clientProducts/getProductDetails",
    async (id) => {
      try {
        const response1 = await axios.get(`/client/product/${id}`);
        const catid = response1.data.categoryId;
        const response2 = await axios.get(`/client/category/${catid}`);
  
        console.log(id);
        //console.log('getProductDetails OK', response1.data)
        //console.log("categoriaaaa", response2.data)
        return [response1.data, response2.data.name];
      } catch (error) {
        console.log("ERRORR GETPRODUCTDETAILS REDUX", error);
        throw error;
      }
    }
  );

  export const getProductsSearched = createAsyncThunk(
    "clientProducts/getProductsSearched",
    async (name) => {
      try {
        const response = await axios.get(`/client/allproducts?name=${name}`);
        console.log("RESPUESTA DEL SEARCH", response.data);
  
        return response.data;
      } catch (error) {
        console.log("ERRORR GETALLPRODUCTS REDUX", error);
        throw error;
      }
    }
  );

export const setFilteredProducts = createAction("clientProducts/setFilteredProducts");
export const setCurrentFilteredProducts = createAction('clientProducts/setCurrentFilteredProducts');
export const setIdCategory = createAction("clientProducts/setIdCategory");
export const setIdBrand = createAction("clientProducts/setIdBrand");
export const setMinPrice = createAction("clientProducts/setMinPrice");
export const setMaxPrice = createAction("clientProducts/setMaxPrice");
export const sortAlphabetically = createAction("clientProducts/sortAlphabetically");
export const sortByPrice = createAction("clientProducts/sortByPrice");
export const setSelectedValueToFilter = createAction("clientProducts/setSelectedValueToFilter");
export const clearDetails = createAction("clientProducts/clearDetails");
export const clearProductsByCategory = createAction(
  "clientProducts/clearProductsByCategory"
);
const clientProductsSlice = createSlice({
  name: "clientProducts",
  initialState,
  reducers: {
    clearProductsByCategory: (state) => {
      state.productsByCategory = {};
      state.category = "";
    },
    clearDetails: (state) => {
      state.productDetails = {};
      state.category = "";
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setCurrentFilteredProducts: (state, action) => {
      state.currentFilteredProducts = action.payload;
    },
    setIdCategory: (state, action) => {
      state.idCategory = action.payload;
    },
    setIdBrand: (state, action) => {
      state.idBrand = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    sortAlphabetically: (state, action) => {
      if (state.filteredProducts.length > 0) {
        let sortedFilteredProducts = [...state.filteredProducts];
        if (action.payload === 'ascendent') {
          sortedFilteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (action.payload === 'descendent') {
          sortedFilteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
        state.filteredProducts = sortedFilteredProducts;
      } else {
        state.filteredProducts = [];
      }
    },
    sortByPrice: (state, action) => {
      if (state.filteredProducts.length > 0) {
        let sortedFilteredProducts = [...state.filteredProducts];
        if (action.payload === 'moreExpensive') {
          sortedFilteredProducts.sort((a, b) => b.price - a.price);
        }
        if (action.payload === 'cheapest') {
          sortedFilteredProducts.sort((a, b) => a.price - b.price);
        }
        state.filteredProducts = sortedFilteredProducts;
      } else {
        state.filteredProducts = [];
      }
    },
    setSelectedValueToFilter: (state, action) => {
      state.selectedValueToFilter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      .addCase(getFilteredProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.selectedValueToFilter && action.payload.length > 0) {
          let sortedFilteredProducts = [...action.payload];
          if (state.selectedValueToFilter === 'ascendent') {
            sortedFilteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          }
          if (state.selectedValueToFilter === 'descendent') {
            sortedFilteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          }
          if (state.selectedValueToFilter === 'moreExpensive') {
            sortedFilteredProducts.sort((a, b) => b.price - a.price);
          }
          if (state.selectedValueToFilter === 'cheapest') {
            sortedFilteredProducts.sort((a, b) => a.price - b.price);
          }
          state.filteredProducts = sortedFilteredProducts;
        } else {
            state.filteredProducts = action.payload;
        }
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      .addCase(getProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsByCategory = action.payload;
        state.error = null;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload[0];
        state.category = action.payload[1];
        state.error = null;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })


  },
});


export default clientProductsSlice.reducer;
