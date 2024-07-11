// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ダークモード切り替え
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// スクロールアニメーション
document.addEventListener("DOMContentLoaded", () => {
    // 初期状態でfade-in-hiddenクラスを追加
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-hidden');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.classList.remove('fade-in-hidden');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// チャットボット
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chat-button');
    const chatPopup = document.getElementById('chat-popup');
    const closeChat = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const quickReplies = document.getElementById('quick-replies');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    chatButton.addEventListener('click', () => {
        chatPopup.style.display = 'block';
        chatPopup.classList.add('fade-in');
    });

    closeChat.addEventListener('click', () => {
        chatPopup.classList.remove('fade-in');
        chatPopup.classList.add('fade-out');
        setTimeout(() => {
            chatPopup.style.display = 'none';
            chatPopup.classList.remove('fade-out');
        }, 300);
    });

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (chatInput.value.trim() !== '') {
            addMessage('user', chatInput.value);
            respondToUser(chatInput.value);
            chatInput.value = '';
        }
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function respondToUser(userMessage) {
        setTimeout(() => {
            let botResponse = "申し訳ありません。ただいま応答を生成できません。";
            if (userMessage.toLowerCase().includes('こんにちは')) {
                botResponse = "こんにちは！どのようなご用件でしょうか？";
            } else if (userMessage.toLowerCase().includes('スキル')) {
                botResponse = "私のスキルについて知りたいですか？HTML、CSS、JavaScript、そしてReactの基礎知識があります。";
            } else if (userMessage.toLowerCase().includes('プロジェクト')) {
                botResponse = "私のプロジェクトに興味がありますか？個人ブログ、Todoリストアプリ、天気予報アプリなどを作成しました。";
            }
            addMessage('bot', botResponse);
            showQuickReplies();
        }, 1000);
    }

    function showQuickReplies() {
        const replies = ['スキルについて', 'プロジェクトについて', 'お問い合わせ'];
        quickReplies.innerHTML = '';
        replies.forEach(reply => {
            const button = document.createElement('button');
            button.classList.add('quick-reply-btn');
            button.textContent = reply;
            button.addEventListener('click', () => {
                addMessage('user', reply);
                respondToUser(reply);
            });
            quickReplies.appendChild(button);
        });
    }

    // 初期メッセージ
    setTimeout(() => {
        addMessage('bot', 'こんにちは！私はポートフォリオ紹介チャットボットです。何か質問がありますか？');
        showQuickReplies();
    }, 500);
});
