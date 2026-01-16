import api from './api';

export const settingsService = {
  async getSettings() {
    const response = await api.get('/api/settings');
    return response.data;
  },

  async updateSetting(key, value) {
    const response = await api.put('/api/settings', { key, value });
    return response.data;
  },

  async updateSettingsBatch(settings) {
    const response = await api.post('/api/settings/batch', settings);
    return response.data;
  }
};
