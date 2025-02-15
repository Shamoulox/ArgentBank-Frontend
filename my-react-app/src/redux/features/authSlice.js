import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token:null,
  error: null,
  profiles: null,
};

// ---------- Créer une action asynchrone pour la connexion de l'utilisateur Fetch API ----------
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
            console.log("réponse de l'api token", result); // Vérifier la structure de la réponse
            if (response.ok) {
                return result; // Retourne le token reçu du serveur pour le stocker dans redux
            } else {
                // Retourner un message d'erreur si la requête a échoué
                return rejectWithValue((result.message || "Problème de connexion")
                );
            }
        } catch (error) {
            console.log("Erreur reseau", error);
            return rejectWithValue("Problème réseau" + error.message);
        }
    }
);

// --------- Créer un slice pour gérer l'authentification----------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      // Supprimer le token du sessionStorage
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        console.log("userProfiles fullfilled", action.payload);
        state.token = action.payload.token;
        
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.payload || "Erreur inconnue";
      });
  },
});

// --------- Créer une action asynchrone pour récupérer les données UserProfil (Put) ----------

export const UserUpdate = createAsyncThunk (
'auth/UserUpdate',
async (data, {rejectWithValue}) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("réponse de l'api UserUpdate", result); // Vérifier la structure de la réponse
    if (response.ok) {
      return result;
    } else {
      // Retourner un message d'erreur si la requête a échoué
      return rejectWithValue("Pb Récupération Réseau UserUpdate" + result.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
}

);


// --------- Créer un une action asynch pour récupérer les profils utilisateurs (get)----------

export const UserProfiles = createAsyncThunk(
  "auth/profiles",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profiles",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data}`,
          },
        }
      );
      const result = await response.json();
      console.log("réponse de l'api Profil", result); // Vérifier la structure de la réponse
      if (response.ok) {
        return result;
      } else {
        // Retourner un message d'erreur si la requête a échoué
        return rejectWithValue("Pb Récupération Réseau Profil" + result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);













export const { logout } = authSlice.actions;
export default authSlice.reducer;
