/**
 * Собственный клиент для работы с Netlify Blobs API
 * Обходит проблемы с fetch в библиотеке @netlify/blobs
 */
class NetlifyBlobsClient {
  constructor(siteID, token) {
    this.siteID = siteID;
    this.token = token;
    this.baseURL = `https://api.netlify.com/api/v1/sites/${siteID}/blobs`;
  }

  /**
   * Получить данные из Blobs
   */
  async get(key) {
    try {
      const response = await fetch(`${this.baseURL}/${key}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Данных нет
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Ошибка получения данных из Blobs:', error);
      throw error;
    }
  }

  /**
   * Сохранить данные в Blobs
   */
  async set(key, value) {
    try {
      const response = await fetch(`${this.baseURL}/${key}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: value
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Ошибка сохранения данных в Blobs:', error);
      throw error;
    }
  }

  /**
   * Удалить данные из Blobs
   */
  async delete(key) {
    try {
      const response = await fetch(`${this.baseURL}/${key}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Ошибка удаления данных из Blobs:', error);
      throw error;
    }
  }

  /**
   * Проверить доступность Blobs
   */
  async test() {
    try {
      const testKey = 'test-connection';
      const testValue = JSON.stringify({ test: true, timestamp: new Date().toISOString() });
      
      await this.set(testKey, testValue);
      const retrieved = await this.get(testKey);
      await this.delete(testKey);
      
      return retrieved === testValue;
    } catch (error) {
      console.error('Тест подключения к Blobs не прошел:', error);
      return false;
    }
  }
}

export default NetlifyBlobsClient;
