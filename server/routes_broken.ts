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
        <button onclick="window.history.back()" class="dashboard-back-btn">
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
      // For demo purposes, using a default user ID of 1
      const userId = 1;
      let preferences = await storage.getUserPreferences(userId);
      
      if (!preferences) {
        // Create default preferences if none exist
        preferences = await storage.createUserPreferences({
          userId,
          favorites: ['kt', 'template'],
          recentTabs: ['kt'],
          settings: {}
        });
      }
      
      res.json(preferences);
    } catch (error) {
      console.error("Error getting preferences:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update user preferences
  app.post("/api/preferences", async (req, res) => {
    try {
      const userId = 1; // For demo purposes
      const { favorites, recentTabs, settings } = req.body;
      
      const preferences = await storage.updateUserPreferences(userId, {
        favorites,
        recentTabs,
        settings
      });
      
      res.json(preferences);
    } catch (error) {
      console.error("Error updating preferences:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get available calculators
  app.get("/api/calculators", (req, res) => {
    const calculators = [
      {
        id: 'kt',
        name: 'KT',
        icon: '🔥',
        color: '#e11d48',
        premium: true,
        description: 'KT 결합 할인 계산기'
      },
      {
        id: 'lg',
        name: 'LG유플러스',
        icon: '📡',
        color: '#8b5cf6',
        premium: false,
        description: 'LG유플러스 계산기'
      },
      {
        id: 'sk',
        name: 'SK',
        icon: '⚡',
        color: '#0ea5e9',
        premium: false,
        description: 'SK브로드밴드 계산기'
      },
      {
        id: 'lgsoho',
        name: 'LG소호',
        icon: '🏢',
        color: '#10b981',
        premium: false,
        description: 'LG헬로비전 소호 계산기'
      },
      {
        id: 'hellovision',
        name: '헬로비전',
        icon: '📺',
        color: '#ef4444',
        premium: false,
        description: 'LG 헬로비전 계산기'
      },
      {
        id: 'skyhcn',
        name: 'SKY/HCN',
        icon: '🛰️',
        color: '#f59e0b',
        premium: false,
        description: 'SKY중앙방송 계산기'
      },
      {
        id: 'skpop',
        name: 'SK POP',
        icon: '🚀',
        color: '#06b6d4',
        premium: false,
        description: 'SK브로드밴드 POP 계산기'
      },
      {
        id: 'template',
        name: '템플릿',
        icon: '📋',
        color: '#6366f1',
        premium: false,
        description: '상담원 템플릿 모음'
      }
    ];
    
    res.json(calculators);
  });

  const httpServer = createServer(app);
  return httpServer;
}
