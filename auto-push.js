// University Dungeon - Auto Push Script
const { execSync } = require('child_process');
const fs = require('fs');

function autoPush() {
    try {
        console.log('🎮 University Dungeon - Auto Push to GitHub');
        console.log('==========================================');
        
        // Check if there are changes
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        
        if (!status.trim()) {
            console.log('✅ No changes to push. Repository is up to date.');
            return;
        }
        
        console.log('📝 Changes detected:');
        console.log(status);
        
        // Add all changes
        console.log('\n➕ Adding changes...');
        execSync('git add .', { stdio: 'inherit' });
        
        // Commit with timestamp
        const timestamp = new Date().toLocaleString();
        console.log('\n💾 Committing changes...');
        execSync(`git commit -m "Auto-update: ${timestamp}"`, { stdio: 'inherit' });
        
        // Push to GitHub
        console.log('\n🚀 Pushing to GitHub...');
        execSync('git push origin main', { stdio: 'inherit' });
        
        console.log('\n✅ Deployment complete! Your game is now live on GitHub.');
        
    } catch (error) {
        console.error('❌ Error during auto-push:', error.message);
        
        if (error.message.includes('repository not found')) {
            console.log('\n🔧 Setup needed:');
            console.log('1. Create repository on GitHub: https://github.com/new');
            console.log('2. Name it: university-dungeon');
            console.log('3. Run: git remote set-url origin https://github.com/MHaenen/university-dungeon.git');
            console.log('4. Run this script again');
        }
    }
}

// Run auto-push
autoPush();
