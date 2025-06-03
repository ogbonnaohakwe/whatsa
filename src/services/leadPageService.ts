import { OptinPage, FormField } from '../types';

/**
 * Lead Page service for managing opt-in forms and lead capture pages
 * This is a mock implementation - in a real app, these methods would make API calls
 */
export const leadPageService = {
  // Create a new lead page
  createLeadPage: async (page: Partial<OptinPage>): Promise<{ success: boolean; page?: OptinPage; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock page creation
      const newPage: OptinPage = {
        id: `page-${Date.now()}`,
        name: page.name || 'Untitled Page',
        description: page.description || '',
        fields: page.fields || [],
        theme: page.theme || 'light',
        customColors: page.customColors,
        targetGroup: page.targetGroup,
        createdAt: new Date(),
        visits: 0,
        conversions: 0,
      };
      
      return { success: true, page: newPage };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create lead page' 
      };
    }
  },
  
  // Update an existing lead page
  updateLeadPage: async (id: string, updates: Partial<OptinPage>): Promise<{ success: boolean; page?: OptinPage; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock page update
      const updatedPage: OptinPage = {
        id,
        name: updates.name || 'Untitled Page',
        description: updates.description || '',
        fields: updates.fields || [],
        theme: updates.theme || 'light',
        customColors: updates.customColors,
        targetGroup: updates.targetGroup,
        createdAt: updates.createdAt || new Date(),
        visits: updates.visits || 0,
        conversions: updates.conversions || 0,
      };
      
      return { success: true, page: updatedPage };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update lead page' 
      };
    }
  },
  
  // Delete a lead page
  deleteLeadPage: async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock successful deletion
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete lead page' 
      };
    }
  },
  
  // Get the JavaScript widget code for embedding a lead page
  getWidgetCode: async (id: string): Promise<{ success: boolean; code?: string; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock widget code
      const code = `
<script>
  (function(w, d, s, o) {
    var js = d.createElement(s);
    js.src = 'https://whatsapp-responder.com/widget.js';
    js.onload = function() {
      w.WhatsAppWidget.init({
        pageId: '${id}',
        containerId: o || 'whatsapp-optin-container',
        position: 'bottom-right'
      });
    };
    if (d.getElementById(o)) {
      d.getElementById(o).appendChild(js);
    } else {
      d.head.appendChild(js);
    }
  })(window, document, 'script', 'whatsapp-optin-container');
</script>
<div id="whatsapp-optin-container"></div>
      `;
      
      return { success: true, code };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate widget code' 
      };
    }
  },
  
  // Export the lead page configuration as JSON
  exportPageAsJson: async (id: string): Promise<{ success: boolean; data?: string; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock JSON data
      const mockPage: OptinPage = {
        id,
        name: 'Sample Lead Page',
        description: 'Sample lead page for export',
        fields: [
          { id: '1', type: 'text', label: 'Name', placeholder: 'Your name', required: true },
          { id: '2', type: 'email', label: 'Email', placeholder: 'Your email', required: true },
          { id: '3', type: 'phone', label: 'WhatsApp Number', placeholder: 'Your WhatsApp number', required: true },
        ],
        theme: 'light',
        targetGroup: '1',
        createdAt: new Date(),
        visits: 120,
        conversions: 45,
      };
      
      const jsonData = JSON.stringify(mockPage, null, 2);
      
      return { success: true, data: jsonData };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to export page configuration' 
      };
    }
  }
};