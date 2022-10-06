import type { Request, Response } from 'express';

import { hashPassword } from '../services/user.service';
import { CreateUser } from '../types/User';
import AppLog from '../events/AppLog';

export async function create(req: Request, res: Response) {
  const { full_name, username, password, company }: CreateUser = req.body;
  const encryptedPassword = hashPassword(password);
}
