import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Search, Phone, Settings } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요! 카카오톡 스타일 AI 채팅봇입니다. 무엇을 도와드릴까요?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      // 자체 API 엔드포인트 호출 (서버리스 함수)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '서버 오류가 발생했습니다.');
      }

      const aiMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: error.message || "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="chat-container">
      {/* 헤더 */}
      <div className="chat-header">
        <div className="header-left">
          <Menu size={24} />
          <span className="chat-title">AI 채팅봇</span>
        </div>
        <div className="header-right">
          <Search size={24} />
          <Phone size={24} />
          <Settings size={24} />
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'ai' && (
              <div className="avatar">
                <div className="ai-avatar">AI</div>
              </div>
            )}
            <div className="message-content">
              <div className="message-bubble">
                {message.text}
              </div>
              <div className="message-time">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai">
            <div className="avatar">
              <div className="ai-avatar">AI</div>
            </div>
            <div className="message-content">
              <div className="message-bubble typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            rows={1}
            className="message-input"
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage}
            className={`send-button ${inputText.trim() ? 'active' : ''}`}
            disabled={isLoading || !inputText.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App; 