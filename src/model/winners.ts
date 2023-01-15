import {
  Car, CarData, Winner, WinnerData,
} from '../types';

class Winners {
  /* Returns json data about winners. */
  static async getWinners(page = 0, limit = 0, sort = 'id', order = 'ASC'): Promise<Winner[]> {
    return fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Winner[]>;
      });
  }

  /* Returns json data about specified winner. */
  static async getWinner(id: number): Promise<Winner> {
    return fetch(`http://127.0.0.1:3000/winners/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Winner>;
      });
  }

  /* Delete specified car from a garage */
  static async deleteWinner(id: number): Promise<void> {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('DELETED');
        } else {
          console.log('NOT DELETED');
        }
      });
  }

  /* Creates a new records in a winners table. */
  static async createWinner(data: Winner): Promise<Winner> {
    return fetch('http://127.0.0.1:3000/winners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Winner>;
      });
  }

  /* Updates attributes of specified winner. */
  static async updateWinner(data: WinnerData, id: number): Promise<Winner> {
    return fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json() as Promise<Winner>);
  }
}

export default Winners;
