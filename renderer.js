const app = {
  skills: [],
  currentSkill: null,
  rawOutput: '',

  async init() {
    this.skills = await window.api.getSkills();
    this.renderSkillsGrid();
    
    document.getElementById('skill-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.runAnalysis();
    });
  },

  showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  },

  renderSkillsGrid() {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';
    
    this.skills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML = `
        <h3>${escapeHTML(skill.name)}</h3>
        <p>${escapeHTML(skill.description)}</p>
      `;
      card.onclick = () => this.openSkill(skill);
      grid.appendChild(card);
    });
    
    this.showView('view-skills');
  },

  openSkill(skill) {
    this.currentSkill = skill;
    document.getElementById('skill-title').textContent = skill.name;
    document.getElementById('skill-description').textContent = skill.description;
    
    const formInputs = document.getElementById('form-inputs');
    formInputs.innerHTML = '';
    
    skill.inputs.forEach(input => {
      const group = document.createElement('div');
      group.className = 'form-group';
      
      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.textContent = input.label;
      group.appendChild(label);
      
      let field;
      if (input.type === 'textarea') {
        field = document.createElement('textarea');
      } else {
        field = document.createElement('input');
        field.type = input.type || 'text';
      }
      field.id = input.id;
      field.placeholder = input.placeholder || '';
      field.required = true;
      group.appendChild(field);
      
      formInputs.appendChild(group);
    });
    
    const existingError = document.querySelector('.error-msg');
    if (existingError) existingError.remove();

    this.showView('view-input');
  },

  showSkills() {
    this.currentSkill = null;
    this.showView('view-skills');
  },

  async runAnalysis() {
    if (!this.currentSkill) return;
    
    const inputs = {};
    this.currentSkill.inputs.forEach(input => {
      inputs[input.id] = document.getElementById(input.id).value;
    });
    
    let prompt = this.currentSkill.promptTemplate;
    for (const [key, value] of Object.entries(inputs)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      prompt = prompt.replace(regex, value);
    }
    
    const model = document.getElementById('model-selector').value;
    
    this.showView('view-loading');
    
    try {
      const response = await window.api.generateResponse(model, prompt);
      this.rawOutput = response;
      this.renderOutput(response);
      this.showView('view-output');
    } catch (error) {
      console.error(error);
      this.showView('view-input');
      this.showError(error.message);
    }
  },

  showError(message) {
    const existingError = document.querySelector('.error-msg');
    if (existingError) existingError.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-msg';
    errorDiv.textContent = `Error: ${message}. (Check your API keys in the .env file)`;
    
    const form = document.getElementById('skill-form');
    form.parentNode.insertBefore(errorDiv, form);
  },

  renderOutput(jsonStr) {
    const container = document.getElementById('output-content');
    container.innerHTML = '';
    
    let data;
    try {
      let cleaned = jsonStr.replace(/^```.*?[\r\n]+|```[\r\n]*$/g, '').trim();
      data = JSON.parse(cleaned);
    } catch (e) {
      console.warn("Failed to parse JSON", e);
      container.textContent = jsonStr;
      return;
    }
    
    for (const [key, value] of Object.entries(data)) {
      const section = document.createElement('div');
      section.className = 'output-section';
      
      const title = document.createElement('h3');
      title.textContent = key;
      section.appendChild(title);
      
      if (Array.isArray(value)) {
        const ul = document.createElement('ul');
        value.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
        });
        section.appendChild(ul);
      } else {
        const p = document.createElement('p');
        p.textContent = value;
        section.appendChild(p);
      }
      
      container.appendChild(section);
    }
  },

  copyOutput() {
    let textToCopy = '';
    const container = document.getElementById('output-content');
    
    const sections = container.querySelectorAll('.output-section');
    if (sections.length > 0) {
      sections.forEach(sec => {
        textToCopy += sec.querySelector('h3').textContent + '\n';
        const p = sec.querySelector('p');
        if (p) textToCopy += p.textContent + '\n\n';
        
        const ul = sec.querySelector('ul');
        if (ul) {
          const lis = ul.querySelectorAll('li');
          lis.forEach(li => textToCopy += '- ' + li.textContent + '\n');
          textToCopy += '\n';
        }
      });
    } else {
      textToCopy = container.textContent;
    }
    
    navigator.clipboard.writeText(textToCopy.trim()).then(() => {
      const btn = document.querySelector('.output-header .btn.secondary');
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = originalText, 2000);
    });
  }
};

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

window.addEventListener('DOMContentLoaded', () => {
  app.init();
});
