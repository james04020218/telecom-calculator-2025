import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserPreferencesSchema } from "@shared/schema";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Serve original calculator HTML files directly with back button
  app.get("/calculator/:telecom", (req, res) => {
    const telecom = req.params.telecom;
    const allowedTelecoms = ['kt', 'lg', 'sk', 'lgsoho', 'hellovision', 'skyhcn', 'skpop', 'template'];
    
    if (!allowedTelecoms.includes(telecom)) {
      return res.status(404).send('<h1>Calculator not found</h1>');
    }
    
    // Map template to smile_template filename
    const filename = telecom === 'template' ? 'smile_template.html' : `${telecom}.html`;
    const filePath = path.resolve(__dirname, 'original', filename);
    
    console.log(`Serving calculator file: ${filePath}`);
    
    // Read the HTML file and inject back button
    fs.readFile(filePath, 'utf8', (err: any, data: string) => {
      if (err) {
        console.error(`Error reading ${filename}:`, err);
        return res.status(404).send('<h1>Calculator file not found</h1>');
      }
      
      // Inject back button CSS and HTML
      const backButtonCSS = `
        <style>
          .dashboard-back-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 9999;
            background: rgba(37, 99, 235, 0.95);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .dashboard-back-btn:hover {
            background: rgba(29, 78, 216, 0.95);
            transform: translateY(-1px);
            box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.15);
          }
          .dashboard-back-btn svg {
            width: 16px;
            height: 16px;
          }
        </style>
      `;
      
      const backButtonHTML = `
        <button onclick="window.location.href = '/'" class="dashboard-back-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          대시보드로 돌아가기
        </button>
      `;
      
      // Insert CSS before closing head tag
      let modifiedHTML = data.replace('</head>', `${backButtonCSS}</head>`);
      
      // Insert back button after opening body tag
      modifiedHTML = modifiedHTML.replace('<body', `${backButtonHTML}<body`);
      
      res.send(modifiedHTML);
    });
  });

  // Keep the API endpoint for compatibility
  app.get("/api/calculator/:telecom", (req, res) => {
    const telecom = req.params.telecom;
    const allowedTelecoms = ['kt', 'lg', 'sk', 'lgsoho', 'hellovision', 'skyhcn', 'skpop', 'template'];
    
    if (!allowedTelecoms.includes(telecom)) {
      return res.status(404).json({ message: "Calculator not found" });
    }
    
    // Redirect to the direct route
    res.redirect(301, `/calculator/${telecom}`);
  });

  // Get user preferences (using in-memory storage for now)
  app.get("/api/preferences", async (req, res) => {
    try {
      const userId = 1; // Default user for demo
      let preferences = await storage.getUserPreferences(userId);
      
      if (!preferences) {
        // Create default preferences
        preferences = await storage.createUserPreferences({
          userId: userId,
          favorites: ['kt', 'template'],
          recentTabs: ['kt'],
          settings: {}
        });
      }
      
      res.json(preferences);
    } catch (error) {
      console.error("Error fetching preferences:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update user preferences
  app.post("/api/preferences", async (req, res) => {
    try {
      const userId = 1; // Default user for demo
      const validatedData = insertUserPreferencesSchema.parse(req.body);
      
      const updatedPreferences = await storage.updateUserPreferences(userId, validatedData);
      res.json(updatedPreferences);
    } catch (error) {
      console.error("Error updating preferences:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get calculator list
  app.get("/api/calculators", (req, res) => {
    const calculators = [
      {
        id: 'kt',
        name: 'KT',
        icon: '🔥',
        color: 'from-red-500 to-orange-500',
        premium: true,
        description: 'KT 인터넷, TV, 모바일 결합 할인 계산기'
      },
      {
        id: 'lg',
        name: 'LG유플러스',
        icon: '🌟',
        color: 'from-pink-500 to-fuchsia-500',
        premium: true,
        description: 'LG U+ 인터넷, TV, 모바일 결합 할인 계산기'
      },
      {
        id: 'sk',
        name: 'SK',
        icon: '⚡',
        color: 'from-red-600 to-orange-600',
        premium: true,
        description: 'SK브로드밴드 인터넷, TV 결합 할인 계산기'
      },
      {
        id: 'lgsoho',
        name: 'LG소호',
        icon: '🏢',
        color: 'from-violet-500 to-purple-500',
        premium: true,
        description: 'LG U+ 소호 전용 결합 할인 계산기'
      },
      {
        id: 'hellovision',
        name: '헬로비전',
        icon: '📺',
        color: 'from-green-500 to-emerald-500',
        premium: true,
        description: '헬로비전 케이블 TV, 인터넷 결합 할인 계산기'
      },
      {
        id: 'skyhcn',
        name: 'SKY/HCN',
        icon: '🛰️',
        color: 'from-sky-500 to-blue-500',
        premium: true,
        description: 'SKY 위성방송, HCN 케이블 결합 할인 계산기'
      },
      {
        id: 'skpop',
        name: 'SK팝',
        icon: '🎯',
        color: 'from-purple-500 to-pink-500',
        premium: true,
        description: 'SK팝 전용 할인 계산기'
      },
      {
        id: 'template',
        name: '미소 템플릿 모음',
        icon: '📋',
        color: 'from-gray-500 to-slate-500',
        premium: false,
        description: '미소 인터넷 고객 상담 문자 메시지 템플릿 모음'
      }
    ];
    
    res.json(calculators);
  });

  const httpServer = createServer(app);
  return httpServer;
}