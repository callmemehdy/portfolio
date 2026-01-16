# Project Visibility Feature

Now you can control which projects are visible on your public portfolio while keeping them in your admin panel.

## How It Works

- **Public Portfolio** (http://localhost:5173): Only shows projects marked as "visible"
- **Admin Panel** (http://localhost:5173/login): Shows ALL projects with visibility status

## How to Use

### Hiding a Project

1. Go to Admin Panel: http://localhost:5173/login
2. In the "SELECTED PROJECTS" section, find the project
3. Click the eye icon button (👁) next to EDIT
4. The project will be marked as [HIDDEN] and won't appear on your public portfolio
5. The icon changes to 🚫 when hidden

### Making a Project Visible Again

1. Find the hidden project (it will show [HIDDEN] next to its name)
2. Click the �� button
3. The project will be visible on your public portfolio again
4. The icon changes back to 👁

## Use Cases

- **Work in Progress**: Hide projects you're still working on
- **Private Projects**: Keep certain projects in your list but not public
- **Selective Display**: Show only your best work to visitors
- **Testing**: Hide projects while you update their descriptions

## What Gets Hidden

When a project is hidden:
- It won't appear on the public portfolio page
- It won't show in the Projects section for visitors
- YOU can still see it in the admin panel
- YOU can still edit its description and order

## Database Migration

The migration has been completed automatically. All existing projects are set to "visible" by default.

## Technical Details

- New database column: `is_visible` (Boolean, default: True)
- Public endpoint: `/api/projects` - Returns only visible projects
- Admin endpoint: `/api/projects/all` - Returns all projects (requires auth)
- Frontend: Auto-detects visibility and updates display accordingly

