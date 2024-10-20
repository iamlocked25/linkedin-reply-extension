(function () {
  let icon: HTMLImageElement | null = null;
  let modal: HTMLDivElement | null = null;

  document.addEventListener('focusin', (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'TEXTAREA') {
      showAIIcon(target);
    }
  });

  document.addEventListener('focusout', (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'TEXTAREA') {
      removeAIIcon();
    }
  });

  function showAIIcon(inputElement: HTMLElement) {
    if (!icon) {
      icon = document.createElement('img');
      icon.src = chrome.runtime.getURL('ai-icon.svg');
      icon.style.position = 'absolute';
      icon.style.cursor = 'pointer';
      icon.style.width = '24px';
      icon.style.height = '24px';
      icon.style.top = `${inputElement.getBoundingClientRect().top - 30}px`;
      icon.style.left = `${inputElement.getBoundingClientRect().left + inputElement.offsetWidth - 30}px`;

      document.body.appendChild(icon);

      icon.addEventListener('click', () => {
        showModal();
      });
    }
  }

  function removeAIIcon() {
    if (icon) {
      icon.remove();
      icon = null;
    }
  }

  function showModal() {
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'aiModal';
      modal.className =
        'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white border border-gray-300 p-5 z-50';
      modal.innerHTML = `
                <input type="text" id="commandInput" placeholder="Type a command" class="w-full mb-4 p-2 border rounded" />
                <button id="generateBtn" class="bg-blue-500 text-white p-2 rounded">Generate</button>
                <button id="insertBtn" class="bg-green-500 text-white p-2 rounded ml-4" disabled>Insert</button>
            `;
      document.body.appendChild(modal);

      const commandInput = document.getElementById('commandInput') as HTMLInputElement;
      const insertBtn = document.getElementById('insertBtn') as HTMLButtonElement;

      commandInput.addEventListener('input', () => {
        insertBtn.disabled = !commandInput.value.trim(); // Enable/disable button based on input
      });

      document.getElementById('generateBtn')?.addEventListener('click', () => {
        commandInput.value = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;
        insertBtn.disabled = false; // Enable the insert button after generating text
      });

      insertBtn.addEventListener('click', () => {
        insertTextIntoInput(commandInput.value);
        closeModal();
      });

      document.addEventListener('click', outsideClickHandler);
    }
  }

  function closeModal() {
    if (modal) {
      modal.remove();
      modal = null;
      document.removeEventListener('click', outsideClickHandler);
    }
  }

  function outsideClickHandler(event: MouseEvent) {
    if (modal && !modal.contains(event.target as Node) && event.target !== icon) {
      closeModal();
    }
  }

  function insertTextIntoInput(text: string) {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.tagName === 'TEXTAREA') {
      (activeElement as HTMLTextAreaElement).value += text;
    }
  }
})();
