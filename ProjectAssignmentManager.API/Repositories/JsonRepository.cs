using System.Text.Json;

namespace ProjectAssignmentManager.API.Repositories;

public class JsonRepository<T> : IRepository<T> where T : class
{
    private readonly string _filePath;
    private readonly SemaphoreSlim _semaphore = new(1, 1);

    public JsonRepository(string fileName)
    {
        _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", fileName);
        Directory.CreateDirectory(Path.GetDirectoryName(_filePath)!);
        
        if (!File.Exists(_filePath))
        {
            File.WriteAllText(_filePath, "[]");
        }
    }

    public async Task<List<T>> GetAllAsync()
    {
        await _semaphore.WaitAsync();
        try
        {
            var json = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<T>>(json) ?? new List<T>();
        }
        finally
        {
            _semaphore.Release();
        }
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        var items = await GetAllAsync();
        var idProperty = typeof(T).GetProperty("Id");
        return items.FirstOrDefault(item => (Guid)idProperty!.GetValue(item)! == id);
    }

    public async Task<T> AddAsync(T entity)
    {
        await _semaphore.WaitAsync();
        try
        {
            var items = await GetAllAsync();
            items.Add(entity);
            await SaveAllAsync(items);
            return entity;
        }
        finally
        {
            _semaphore.Release();
        }
    }

    public async Task<T> UpdateAsync(T entity)
    {
        await _semaphore.WaitAsync();
        try
        {
            var items = await GetAllAsync();
            var idProperty = typeof(T).GetProperty("Id");
            var entityId = (Guid)idProperty!.GetValue(entity)!;
            
            var index = items.FindIndex(item => (Guid)idProperty.GetValue(item)! == entityId);
            if (index >= 0)
            {
                items[index] = entity;
                await SaveAllAsync(items);
            }
            return entity;
        }
        finally
        {
            _semaphore.Release();
        }
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        await _semaphore.WaitAsync();
        try
        {
            var items = await GetAllAsync();
            var idProperty = typeof(T).GetProperty("Id");
            var removed = items.RemoveAll(item => (Guid)idProperty!.GetValue(item)! == id);
            
            if (removed > 0)
            {
                await SaveAllAsync(items);
                return true;
            }
            return false;
        }
        finally
        {
            _semaphore.Release();
        }
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        var item = await GetByIdAsync(id);
        return item != null;
    }

    private async Task SaveAllAsync(List<T> items)
    {
        var json = JsonSerializer.Serialize(items, new JsonSerializerOptions 
        { 
            WriteIndented = true 
        });
        await File.WriteAllTextAsync(_filePath, json);
    }
}
