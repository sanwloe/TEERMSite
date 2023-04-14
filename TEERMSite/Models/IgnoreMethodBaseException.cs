using System;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

public class IgnoreMethodBaseException : JsonConverter<MethodBase>
{
    public override MethodBase Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new NotSupportedException("Deserialization of 'System.Reflection.MethodBase' is not supported.");
    }

    public override void Write(Utf8JsonWriter writer, MethodBase value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value?.ToString());
    }
}
