import { users, userPreferences, type User, type InsertUser, type UserPreferences, type InsertUserPreferences } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserPreferences(userId: number): Promise<UserPreferences | undefined>;
  updateUserPreferences(userId: number, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences>;
  createUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userPreferences: Map<number, UserPreferences>;
  private currentUserId: number;
  private currentPreferencesId: number;

  constructor() {
    this.users = new Map();
    this.userPreferences = new Map();
    this.currentUserId = 1;
    this.currentPreferencesId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserPreferences(userId: number): Promise<UserPreferences | undefined> {
    return Array.from(this.userPreferences.values()).find(
      (pref) => pref.userId === userId,
    );
  }

  async updateUserPreferences(userId: number, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences> {
    const existing = await this.getUserPreferences(userId);
    if (existing) {
      const updated: UserPreferences = {
        ...existing,
        ...preferences,
        updatedAt: new Date(),
      };
      this.userPreferences.set(existing.id, updated);
      return updated;
    }
    
    // Create new if doesn't exist
    return this.createUserPreferences({ userId, ...preferences } as InsertUserPreferences);
  }

  async createUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences> {
    const id = this.currentPreferencesId++;
    const userPref: UserPreferences = {
      id,
      ...preferences,
      favorites: preferences.favorites || [],
      recentTabs: preferences.recentTabs || [],
      settings: preferences.settings || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.userPreferences.set(id, userPref);
    return userPref;
  }
}

export const storage = new MemStorage();
