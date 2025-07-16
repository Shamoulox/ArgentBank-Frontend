import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// === État initial ===
const initialState = {
  token: sessionStorage.getItem("token") || null,
  error: null,
  profiles: null,
};

// === Actions asynchrones ===

// Connexion utilisateur (POST)
export const UserLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("réponse de l'api token", result);
      if (response.ok) {
        sessionStorage.setItem("token", result.body.token);
        return result;
      } else {
        return rejectWithValue(result.message || "Problème de connexion");
      }
    } catch (error) {
      console.log("Erreur reseau", error);
      return rejectWithValue("Problème réseau" + error.message);
    }
  }
);

// Mise à jour du profil utilisateur (PUT)

export const UserUpdate = createAsyncThunk(
  "auth/UserUpdate",
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName }),
        }
      );
      const result = await response.json();
      console.log("réponse de l'api UserUpdate lors de la mise à jour", result);

      if (response.ok) {
        return result;
      } else {
        return rejectWithValue("Pb de la mise à jour" + result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Récupération du profil utilisateur (GET)
export const UserProfiles = createAsyncThunk(
  "auth/profiles",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data}`,
          },
        }
      );
      const result = await response.json();
      console.log("réponse de l'api Profil", result); // Vérif structure de la réponse
      if (response.ok) {
        return result;
      } else {
        return rejectWithValue(
          "Pb Récupération Réseau Profil" + result.message
        );
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// === Slice pour gérer l'authentification ===
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.profiles = null;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
     // Connexion
      .addCase(UserLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        console.log("userLogin fullfilled", action.payload);
        state.token = action.payload.body.token;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.payload || "Erreur inconnue";
      })
      // Récupération du profil utilisateur
      .addCase(UserProfiles.fulfilled, (state, action) => {
        console.log("userProfiles fullfilled", action.payload);
        state.profiles = action.payload.body;
      })
      .addCase(UserProfiles.rejected, (state, action) => {
        state.error = action.payload || "Erreur inconnue";
      })
      // Mise à jour du profil utilisateur
      .addCase(UserUpdate.fulfilled, (state, action) => {
        state.profiles = action.payload.body;
      })
      .addCase(UserUpdate.rejected, (state, action) => {
        state.error = action.payload || "Erreur inconnue";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
