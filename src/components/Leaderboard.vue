<template>
<div>
    <v-container>
        <v-row>
        <v-col
          cols="12"
          sm="4"
        >
        <v-text-field
            v-model="search"
            label="Search..."
            clearable
          ></v-text-field>
        </v-col>
        </v-row>
    </v-container>
  <v-simple-table style="background-color: lightyellow">
    <template v-slot:default>
      <thead>
        <tr style="border-bottom: 2pt solid grey">
          <th>#</th>
          <th>Username</th>
          <th>Total balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in filterUsers" :key="i">
          <td>{{i + 1}}</td>
          <td>{{user.username}}</td>
          <td>{{user.totalBalance}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
import { getToken, auth } from "../utils";

export default {
    name: 'Leaderboard',
    data: () => ({
        users:[],
        search: ''
    }),
    created() {
        this.setUsers();
    },
    methods: {
        setUsers() {
            this.$axios.get('api/users_total_balance', getToken())
            .then(({data: {users}}) => {
                this.users = users.sort((u1, u2) => u2.totalBalance - u1.totalBalance);
            })
            .catch(({response}) => {
                auth(response);
                console.log("Error in setUsers: ", response.data);
            });
        }
    },
    computed: {
      filterUsers() {
          return this.users.filter(user => {
              if (!this.search) return true;
              return user.username.toLowerCase().includes(this.search.toLowerCase());
          });
      }
  }
}
</script>
